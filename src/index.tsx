import { createRoot } from "react-dom/client";
import {
  ActionButton,
  Menu,
  Item,
  MenuTrigger,
  Provider,
  defaultTheme,
} from "@adobe/react-spectrum";
import { SubmenuTrigger } from "@react-spectrum/menu";

function App() {
  return (
    <Provider theme={defaultTheme} width={74}>
      <MenuTrigger>
        <ActionButton>Actions</ActionButton>
        <Menu onAction={(key) => key}>
          <Item key="copy">Copy Application</Item>
          <Item key="rename">Rename Application</Item>
          <SubmenuTrigger>
            <Item key="move">Move to</Item>
            <Menu onAction={(key) => key}>
              <Item key="move-to-shared">Shared</Item>
              <Item key="move-to-desktop">Desktop</Item>
              <Item key="move-to-favorite">Favorite</Item>
            </Menu>
          </SubmenuTrigger>
          <Item key="delete">Delete</Item>
        </Menu>
      </MenuTrigger>
    </Provider>
  );
}

const rootElement = document.getElementById("root") ?? document.body;
const root = createRoot(rootElement);
root.render(<App />);
