import { useState, StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Menu, Item } from "./Menu";

const App = () => {
  const [activeKey, setActiveKey] = useState("");
  const [submenuVisible, setSubmenuVisible] = useState(false);

  useEffect(() => {
    console.log("Active key is now:", activeKey);
    // Recalculate moveSubItems here if needed or perform actions based on the new activeKey
    if (activeKey === "move") {
      const newMoveSubItems = [
        <Item key="move-to-shared">Shared</Item>,
        <Item key="move-to-desktop">Desktop</Item>,
        <Item key="move-to-favorite">Favorite</Item>,
      ];
      console.log("moveSubItems:", newMoveSubItems);
    }
  }, [activeKey]);

  const handleMenuAction = (key: any) => {
    console.log(`Handling action for key: ${key}`);
    setActiveKey(key);

    // Toggle submenu visibility only for "move"
    if (key === "move") {
      setSubmenuVisible(!submenuVisible);
      console.log("visible");
    } else {
      setSubmenuVisible(false);
    }
  };

  return (
    <StrictMode>
      <Menu
        renderTrigger={(props) => <button {...props}>Actions</button>}
        onAction={handleMenuAction}
        shouldFlip={true}
      >
        <Item key="copy">Copy application</Item>
        <Item key="rename">Rename application</Item>
        {/* "move" item with conditional rendering */}
        <Item key="move" title="Move to">
          {/* Render submenu items only if submenuVisible is true */}
          {submenuVisible && (
            <>
              <Item key="move-to-shared">Shared</Item>
              <Item key="move-to-desktop">Desktop</Item>
              <Item key="move-to-favorite">Favorite</Item>
            </>
          )}
        </Item>
        <Item key="delete">Delete application</Item>
      </Menu>
    </StrictMode>
  );
};

const rootElement = document.getElementById("root") ?? document.body;
const root = createRoot(rootElement);

root.render(<App />);
