
const Header = ({ title }) => {
  return (
    <div className="bg-[rgba(99,157,204,0.55)] text-[#ffffff] font-bold Roboto p-4 rounded-2xl w-2/3 h-32 mx-auto mt-10 shadow-md">
      <h1 className="text-3xl text-shadow-sm text-center">
        {title}
      </h1>
    </div>
  );
};

export default Header;