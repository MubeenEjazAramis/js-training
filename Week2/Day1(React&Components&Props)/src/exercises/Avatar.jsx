export default function Avatar({ src, alt, size = 64 }) {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    objectFit: "cover"
  };

  return <img src={src} alt={alt} style={avatarStyle} />;
}
