import { useState, useCallback, useRef } from 'react';
export interface UseRateLimitProps {
	maxAttempts: number;
	windowMs: number;
	blockDurationMs?: number;
}
export interface UseRateLimitReturn {
	isBlocked: boolean;
	remainingAttempts: number;
	timeUntilReset: number;
	canAttempt: boolean;
	attempt: () => boolean;
	reset: () => void;
}
export function useRateLimit({
	maxAttempts,
	windowMs,
	blockDurationMs = windowMs,
}: UseRateLimitProps): UseRateLimitReturn {
	const [attempts, setAttempts] = useState<number[]>([]);
	const [isBlocked, setIsBlocked] = useState(false);
	const [blockEndTime, setBlockEndTime] = useState<number | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const cleanup = useCallback(() => {
		const now = Date.now();
		setAttempts((prev) =>
			prev.filter((timestamp) => now - timestamp < windowMs),
		);
	}, [windowMs]);
	const updateBlockStatus = useCallback(() => {
		const now = Date.now();
		if (blockEndTime && now >= blockEndTime) {
			setIsBlocked(false);
			setBlockEndTime(null);
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}
	}, [blockEndTime]);
	const attempt = useCallback((): boolean => {
		cleanup();
		updateBlockStatus();
		if (isBlocked) {
			return false;
		}
		const now = Date.now();
		const newAttempts = [...attempts, now];
		if (newAttempts.length >= maxAttempts) {
			setIsBlocked(true);
			setBlockEndTime(now + blockDurationMs);
			// Set up interval to check when block expires
			intervalRef.current = setInterval(() => {
				updateBlockStatus();
			}, 1000);
			setAttempts([]);
			return false;
		}
		setAttempts(newAttempts);
		return true;
	}, [
		attempts,
		cleanup,
		updateBlockStatus,
		isBlocked,
		maxAttempts,
		blockDurationMs,
	]);
	const reset = useCallback(() => {
		setAttempts([]);
		setIsBlocked(false);
		setBlockEndTime(null);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);
	const remainingAttempts = Math.max(0, maxAttempts - attempts.length);
	const timeUntilReset = blockEndTime
		? Math.max(0, blockEndTime - Date.now())
		: 0;
	const canAttempt = !isBlocked && remainingAttempts > 0;
	return {
		isBlocked,
		remainingAttempts,
		timeUntilReset,
		canAttempt,
		attempt,
		reset,
	};
}
