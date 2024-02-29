import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Menu, Item } from "./Menu";
import { SubmenuTrigger } from "@react-spectrum/menu";

const App = () => {
  const handleAction = (key: any) => {
    if (key === "move") {
      // Define your list items
      const items = [
        { key: "move-to-shared", label: "Shared" },
        { key: "move-to-desktop", label: "Desktop" },
        { key: "move-to-favorite", label: "Favorite" },
      ];

      // Convert the list of items into a string format
      const itemsString = items.map((item) => `${item.label}`).join("\n");

      // Display the string in an alert
      alert(itemsString);
    }
  };

  return (
    <StrictMode>
      <Menu
        renderTrigger={(props) => <button {...props}>Actions</button>}
        onAction={handleAction}
        shouldFlip={true}
      >
        <Item key="copy">Copy application</Item>
        <Item key="rename">Rename application</Item>
        <SubmenuTrigger>
          <Item key="move" title="Move to">
            Move to
          </Item>
          <Menu // Submenu with custom behavior
            renderTrigger={(props) => (
              <button onClick={() => handleAction("move")}>Move to...</button>
            )} // Custom trigger for nested menu
            shouldFlip={true} // Adjust as needed
          >
            <Item key="move-to-shared">Shared</Item>
            <Item key="move-to-desktop">Desktop</Item>
            <Item key="move-to-favorite">Favorite</Item>
          </Menu>
        </SubmenuTrigger>
        <Item key="delete">Delete application</Item>
      </Menu>
    </StrictMode>
  );
};

const rootElement = document.getElementById("root") ?? document.body;
const root = createRoot(rootElement);
root.render(<App />);
