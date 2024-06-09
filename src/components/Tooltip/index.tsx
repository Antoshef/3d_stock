import "./styles.css";

interface Props {
  children: React.ReactNode;
  text: string;
}

const Tooltip = ({ children, text }: Props) => (
  <div className="tooltip-container">
    {children}
    <span className="tooltip-text">{text}</span>
  </div>
);

export default Tooltip;
