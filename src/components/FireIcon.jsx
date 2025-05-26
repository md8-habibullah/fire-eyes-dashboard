const FireIcon = ({ size = 48, className = "" }) => (
  <video
    src="https://cdn-icons-mp4.flaticon.com/512/16767/16767287.mp4"
    width={size}
    height={size}
    className={className}
    autoPlay
    loop
    muted
    playsInline
    style={{
      display: "inline",
      verticalAlign: "middle",
      objectFit: "contain",
      borderRadius: "50%",
      background: "none",
      margin: "0 2px"
    }}
  />
);

export default FireIcon;