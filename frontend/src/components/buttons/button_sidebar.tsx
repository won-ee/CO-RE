import { IconImg,NameBox,ContentBox, ChoicedBox, WholeLayout } from "../../styles/button_sidebarStyles"
import { useNavigate } from "react-router-dom";

interface Props{
    img:string;
    name:string;
    ischoiced: boolean;
    path:string;
}

const ButtonSidebar: React.FC<Props> = ({ img, name, ischoiced, path }) => {
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate(path);
  }

    return (
      <>
        <WholeLayout onClick={handleClick}>
          <ChoicedBox $ischoiced={ischoiced}/>
          <ContentBox>
            <IconImg src={img} alt="아이콘"/>
            <NameBox>{name}</NameBox>
          </ContentBox>
        </WholeLayout>
      </>
    );
  };

export default ButtonSidebar