import { memo, useEffect, useRef, useState } from "react";
import { fieldColors } from "./constants";
import { Field } from "./types";
import "./styles.css";

interface Props {
  error: { name: string; message: string } | null;
  onSubmit: (newField: Field) => void;
  setError: (error: { name: string; message: string } | null) => void;
}

const CreateFieldForm = ({ error, setError, onSubmit }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [verticalLevel, setVerticalLevel] = useState(0);

  useEffect(() => {
    if (error?.name === "name") {
      inputRef.current?.focus();
    }
  }, [error]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setName("");
        setColor("");
        setVerticalLevel(0);
        onSubmit({ name, color, verticalLevel });
      }}
      className="create-field-form"
    >
      <div>
        <input
          type="text"
          ref={inputRef}
          className={`financial-table--small-field ${
            error?.name === "name" ? "input-error" : ""
          }`}
          placeholder="Name"
          name="name"
          required
          value={name}
          onChange={(e) => {
            setError(null);
            setName(e.target.value);
          }}
        />
        {error?.name === "name" && (
          <div className="error-message">{error.message}</div>
        )}
      </div>
      <select
        className="financial-table--small-field"
        name="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="">Select Color</option>
        {Object.keys(fieldColors).map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      <input
        type="number"
        className="financial-table--small-field"
        placeholder="Vertical Level"
        name="verticalLevel"
        value={verticalLevel}
        onChange={(e) => setVerticalLevel(parseInt(e.target.value))}
      />
      <button className="financial-table--button" type="submit">
        Add Field
      </button>
    </form>
  );
};

export default memo(CreateFieldForm);
