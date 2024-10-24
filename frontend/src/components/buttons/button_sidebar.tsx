import { IconImg,NameBox,Button_sidebarLayout } from "../../styles/button_sidebarStyles"

interface Props{
    img:string;
    name:string;
}

const ButtonSidebar: React.FC<Props> = ({ img, name }) => {
    return (
      <Button_sidebarLayout>
        <IconImg src={img} alt="아이콘" />
        <NameBox>{name}</NameBox>
      </Button_sidebarLayout>
    );
  };

export default ButtonSidebar