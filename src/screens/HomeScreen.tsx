import logo from "../../public/assets/logo.svg";

interface HomeScreenProps {
  children: React.ReactNode;
}
const HomeScreen: React.FC<HomeScreenProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <div className="flex flex-col items-center justify-center space-y-10">
        <img className="w-10 h-10" src={logo} />
        {children}
      </div>
    </div>
  );
};

export default HomeScreen;
