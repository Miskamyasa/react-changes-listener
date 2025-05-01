import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T {
    const storedValue = useRef<T>(value);

    useEffect(() => {
        if (storedValue.current !== value) {
            storedValue.current = value;
        }
    }, [value]);

    return storedValue.current;
}

type Listener<T, K> = (value: T extends object ? (K extends keyof T ? T[K] : T) : T) => void

export interface ChangesListenerProps<
    T,
    K extends keyof T = T extends object ? keyof T : never,
> {
    useValue: () => T;
    listener: Listener<T, K>;
    field?: K;
}

/**
 * A utility component that listens for changes in a value and triggers a callback when changes occur.
 * Does not render any visible elements in the DOM.
 *
 * @template T The type of the value being watched
 * @template K The type of the key if watching a specific property of an object
 *
 * @example
 * // Watch for changes in the current frame
 * <ChangesListener listener={onFrameChange} useValue={useCurrentPlayerFrame} />
 *
 * // Watch for changes in a specific property of an object
 * <ChangesListener<{ name: string }> listener={onNameChange} useValue={useUserData} field="name" />
 *
 * @ref
 * https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
 */
export function ChangesListener<
    T,
    K extends keyof T = T extends object ? keyof T : never,
>(props: ChangesListenerProps<T, K>) {
    const { useValue, listener, field } = props;

    const res = useValue();

    // Determine the value to watch: if a key is provided and res is an object, watch the property, otherwise watch the whole value.
    const current =
        typeof field !== "undefined" && typeof res === "object" && res !== null
            ? res[field]
            : res;

    const prev = usePrevious<typeof current>(current);


    if ( prev !== current) {
        listener(current as Parameters<Listener<T, K>>[0]);
    }

    return null;
}