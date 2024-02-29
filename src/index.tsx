import { useState, StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Menu, Item } from "./Menu";
import { useTreeData } from "@react-stately/data";

const App = () => {
  const tree = useTreeData({
    initialItems: [
      { textValue: "Copy application", key: "copy" },
      { textValue: "Rename application", key: "rename" },
      {
        textValue: "Move to",
        key: "move",
        items: [
          { textValue: "Shared", key: "move-to-shared" },
          { textValue: "Desktop", key: "move-to-desktop" },
          { textValue: "Favorite", key: "move-to-favorite" },
        ],
      },
      { textValue: "Delete application", key: "delete" },
    ],
    initialSelectedKeys: [],
    getKey: (item) => item.key,
    getChildren: (item) => item.items || [],
  });

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
    setActiveKey(key); // Set the active key
    // Toggle submenu visibility for "move"
    if (key === "move") {
      setSubmenuVisible(!submenuVisible);
    } else {
      // Optionally hide the submenu when other actions are clicked
      setSubmenuVisible(false);
    }
  };

  return (
    <StrictMode>
      <Menu
        renderTrigger={(props) => <button {...props}>Actions</button>}
        onAction={handleMenuAction}
        shouldFlip={false}
      >
        {tree.items.map((node) => (
          <Item key={node.key} textValue={node.value.textValue}>
            {node.value.textValue}
            {node.children &&
              node.children.map((subNode) => (
                <Item key={subNode.key} textValue={subNode.value.textValue}>
                  {subNode.value.textValue}
                </Item>
              ))}
          </Item>
        ))}
      </Menu>
    </StrictMode>
  );
};

const rootElement = document.getElementById("root") ?? document.body;
const root = createRoot(rootElement);

root.render(<App />);
