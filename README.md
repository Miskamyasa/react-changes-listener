## Description

The `ChangesListener` component is a utility for observing changes in a reactive value within your React application. It leverages a custom hook (`useValue`) to access a dynamic value and triggers a provided `listener` function whenever this value changes. Importantly, `ChangesListener` itself does not render any DOM elements, making it a purely functional component for side-effect management based on value changes.

**Key Features:**

*   **Change Detection:** It efficiently detects changes in the value returned by the `useValue` hook.
*   **Targeted Listening (Optional):** For object types, you can specify a `key` prop to listen for changes in a specific property instead of the entire object.
*   **Non-Rendering:** It doesn't add any extra nodes to your component tree.
*   **Clear Separation of Concerns:** It isolates the logic for reacting to value changes, promoting cleaner and more maintainable components.

**Use Cases:**

*   Performing actions when a specific piece of state updates.
*   Triggering animations or transitions based on data changes.
*   Synchronizing data with external systems or APIs when a relevant value is modified.
*   Implementing custom logging or analytics based on state transitions.

**How it Works:**

1.  It accepts a `useValue` prop, which should be a function (typically a custom hook) that returns the reactive value you want to observe.
2.  It uses the provided `useValue` hook to get the current value.
3.  It optionally accepts a `key` prop. If provided and the value is an object, it will only track changes to the property specified by this key.
4.  It utilizes the `usePrevious` hook to store the previous value.
5.  In each render, it compares the current value (or the specific property if a `key` is provided) with the previous value.
6.  If a change is detected, it calls the `listener` function, passing the new value (or the new value of the specific property).

**Example Usage:**

**Watching for changes in a state value:**

 ```typescript jsx
 import { useState } from 'react';
 import { ChangesListener } from 'react-changes-listener'

 function MyComponent() {
   const [count, setCount] = useState(0);

   const handleCountChange = (newCount: number) => {
     console.log(`Count changed to: ${newCount}`);
     // Perform other actions based on the new count
   };

   const useCurrentCount = () => count;

   return (
     <div>
       <p>Count: {count}</p>
       <button onClick={() => setCount(c => c + 1)}>Increment</button>
       <ChangesListener listener={handleCountChange} useValue={useCurrentCount} />
     </div>
   );
 }
 ```

**Watching for changes in a specific property of an object:**

 ```typescript jsx
 import { useState } from 'react';
 import { ChangesListener } from 'react-changes-listener'

 interface User {
   name: string;
   age: number;
 }

 function UserProfile() {
   const [user, setUser] = useState<User>({ name: 'Alice', age: 30 });

   const handleNameChange = (newName: string) => {
     console.log(`Name changed to: ${newName}`);
     // Update user profile in the backend, etc.
   };

   const useCurrentUser = () => user;

   return (
     <div>
       <p>Name: {user.name}</p>
       <p>Age: {user.age}</p>
       <button onClick={() => setUser(prev => ({ ...prev, name: 'Bob' }))}>Change Name</button>
       <ChangesListener<User> listener={handleNameChange} useValue={useCurrentUser} key="name" />
     </div>
   );
 }
 ```

This component provides a flexible and efficient way to respond to value changes within your React applications without cluttering your rendering logic with side-effect management.
