import {useState} from "react";

export default function useCollapse() {
  const [open, setOpen] = useState(false);

  const collapse = () => setOpen(prevState => !prevState)
  const close = () => setOpen(false);

  return {open, collapse, close}
}