function RoundedAvatar({ photo }) {
  return (
    <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primary">
      <img
        src={photo}
        alt=""
        className="w-full h-full object-cover rounded-full"
      />
    </figure>
  );
}

export default RoundedAvatar;
