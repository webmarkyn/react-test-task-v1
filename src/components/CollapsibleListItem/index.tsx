import React, { FunctionComponent, useContext, useEffect } from "react";
import useCollapse from "../../hooks/useCollapse";
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { CurrentItemContext } from "../App";

type Props = {
  text: string;
  collapsible?: boolean;
  continentId: string;
  countryId?: string;
};

const CollapsibleListItem: FunctionComponent<Props> = ({
  text,
  collapsible,
  continentId,
  countryId,
  children,
}) => {
  const { open, collapse, close } = useCollapse();
  const currentItem = useContext(CurrentItemContext);

  const handleCurrentItemChange = () => {
    if (!currentItem || (currentItem.continentId === continentId && !countryId)) return;
    if (currentItem.continentId !== continentId || currentItem.countryId !== countryId) close();
  };

  const handleClick = () => {
    if (!collapsible || !currentItem || !currentItem.setCurrentItem) return;
    if (!open)
      currentItem.setCurrentItem({
        continentId,
        countryId: countryId || undefined,
      });
    console.log(currentItem);
    collapse();
  };

  useEffect(() => {
    handleCurrentItemChange();
  }, [currentItem]);

  const renderChildren = () => {
    return (
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        style={{ paddingLeft: "35px" }}
      >
        <List component="div">{children}</List>
      </Collapse>
    );
  };

  const renderArrow = () => {
    if (!collapsible) return null;
    return open ? <ExpandLess /> : <ExpandMore />;
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={text} />
        {renderArrow()}
      </ListItem>
      {renderChildren()}
    </div>
  );
};

export default CollapsibleListItem;
