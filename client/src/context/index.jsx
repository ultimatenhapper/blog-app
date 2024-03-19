import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [blogList, setBlogList] = useState([]);
  const [pending, setPending] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        blogList,
        formData,
        isEdit,
        setIsEdit,
        pending,
        setBlogList,
        setFormData,
        setPending,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
