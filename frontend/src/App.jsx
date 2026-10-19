//import "./App.css";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

function App() {
 return (
    <>
      <header>
        <Show when="signed-out">
          <SignInButton mode = "modal"/>
          <SignUpButton mode = "modal"/>
        </Show>
        <Show when="signed-in">
          <UserButton />
          <h1>welcome to our app</h1>
        </Show>
      </header>
    </>
  )
}

export default App;
