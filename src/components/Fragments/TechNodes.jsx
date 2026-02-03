export default function TechNodes() {
  const nodes = [
    { top: "10%", left: "15%" },
    { top: "25%", left: "85%" },
    { top: "70%", left: "10%" },
    { top: "85%", left: "80%" },
    { top: "45%", left: "95%" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      {nodes.map((node, index) => (
        <div
          key={index}
          className="tech-node"
          style={{ top: node.top, left: node.left }}
        ></div>
      ))}
    </div>
  );
}
