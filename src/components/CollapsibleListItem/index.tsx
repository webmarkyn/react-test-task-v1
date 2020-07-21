import React, { FunctionComponent, useContext, useEffect } from "react";
import useCollapse from "../../hooks/useCollapse";
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { CloseAllContext } from "../App";

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
  const closeAll = useContext(CloseAllContext);

  const handleCloseAllChange = () => {
    if (closeAll.status) close();
  };

  const handleClick = () => {
    if (closeAll && closeAll.setCloseAll){
      if (collapsible) {
        closeAll.setCloseAll(false);
        collapse();
      } else {
        closeAll.setCloseAll(true);
      }
    }
  };

  useEffect(() => {
    handleCloseAllChange();
  }, [closeAll]);

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
