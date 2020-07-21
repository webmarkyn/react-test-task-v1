import React from "react";
import useCollapse from "../../hooks/useCollapse";
import {Collapse, List, ListItem, ListItemText} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

type Props = {
  text: string;
  collapsible: boolean;
  continentId: string;
  countryId?: string;
  children: React.ReactChildren;
}

export default function CollapsibleListItem({text, collapsible, continentId, countryId, children}: Props) {
  const {open, collapse, close} = useCollapse();

  const renderChildren = () => {
    return (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    )
  }

  const renderArrow = () => {
    if (!collapsible) return null;
    return open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <div>
      <ListItem button onClick={collapse}>
        <ListItemText primary={text}/>
        {renderArrow()}
      </ListItem>
      {renderChildren()}
    </div>
  )
}