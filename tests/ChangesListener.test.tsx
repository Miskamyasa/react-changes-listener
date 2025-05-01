import React, {act, useState} from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ChangesListener } from '../src/ChangesListener';
import { renderHook } from '@testing-library/react-hooks';

// A simple hook for testing purposes
function useTestValue(initialValue: number) {
  const [value, setValue] = useState(initialValue);
  return { value, setValue };
}

describe('ChangesListener Component', () => {
  it('calls listener when value changes', () => {
    const listenerMock = vi.fn();

    const { result } = renderHook(() => useTestValue(1));

    const TestComponent = () => (
      <ChangesListener useValue={() => result.current.value} listener={listenerMock} />
    );

    const { rerender } = render(<TestComponent />);

    expect(listenerMock).not.toHaveBeenCalled();

    act(() => {
      result.current.setValue(2);
    });

    rerender(<TestComponent />);

    expect(listenerMock).toHaveBeenCalledTimes(1);
    expect(listenerMock).toHaveBeenCalledWith(2);
  });

  it('does not call listener when value is unchanged', () => {
    const listenerMock = vi.fn();

    const { result } = renderHook(() => useTestValue(1));

    const TestComponent = () => (
      <ChangesListener useValue={() => result.current.value} listener={listenerMock} />
    );

    const { rerender } = render(<TestComponent />);

    expect(listenerMock).not.toHaveBeenCalled();

    act(() => {
      result.current.setValue(1);
    });

    rerender(<TestComponent />);

    expect(listenerMock).not.toHaveBeenCalled();
  });

  it('calls listener correctly when watching object property', () => {
    const listenerMock = vi.fn();

    const John = { name: 'John', age: 30 };

    function useUserData() {
      const [user, setUser] = useState(John);
      return { user, setUser };
    }

    const { result } = renderHook(() => useUserData());

    const TestComponent = () => (
      <ChangesListener<{user: any}> useValue={() => result.current} listener={listenerMock} field="user" />
    );

    const { rerender } = render(<TestComponent />);

    expect(listenerMock).not.toHaveBeenCalled();

    const Jessy = { name: 'Jessy', age: 30 };

    act(() => {
      result.current.setUser(Jessy);
    });

    rerender(<TestComponent />);

    expect(listenerMock).toHaveBeenCalledTimes(1);
    expect(listenerMock).toHaveBeenCalledWith(Jessy);
  });
});