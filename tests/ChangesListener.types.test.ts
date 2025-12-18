import { describe, it, expectTypeOf } from 'vitest';
import { ChangesListener, ChangesListenerProps } from '../src/ChangesListener';

type Example = { a: number; b: string };

describe('ChangesListener types', () => {
  it('passes full value to listener when no field is provided', () => {
    const props: ChangesListenerProps<Example> = {
      useValue: () => ({ a: 1, b: 'x' }),
      listener: (_value) => undefined,
    };

    expectTypeOf(props.listener).parameter(0).toEqualTypeOf<Example>();
  });

  it('passes specific field type to listener when field is provided', () => {
    const props: ChangesListenerProps<Example, 'b'> = {
      useValue: () => ({ a: 1, b: 'x' }),
      listener: (_value) => undefined,
      field: 'b',
    };

    expectTypeOf(props.listener).parameter(0).toEqualTypeOf<string>();
  });

  it('infers field type from provided field prop', () => {
    const props = {
      useValue: () => ({ a: 1, b: 'x' }),
      listener: (_value) => undefined,
      field: 'b',
    } satisfies ChangesListenerProps<Example>;

    expectTypeOf(props.listener).parameter(0).toEqualTypeOf<string>();
  });
});
