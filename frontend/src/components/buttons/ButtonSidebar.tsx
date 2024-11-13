import { IconImg, NameBox, ContentBox, ChoicedBox, WholeLayout } from "./ButtonSidebar.Styles";
import { useNavigate } from "react-router-dom";

interface Props {
  img: string;
  name: string;
  ischoiced: boolean;
  path: string;
  onClick?: () => void; 
}

const ButtonSidebar: React.FC<Props> = ({ img, name, ischoiced, path, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
    if (onClick) {
      onClick();
    } else {
      navigate(path);
    }
  };


  return (
    <WholeLayout onClick={handleClick}>
      <ChoicedBox $ischoiced={ischoiced} />
      <ContentBox $ischoiced={ischoiced}>
        <IconImg src={img} alt="아이콘" $ischoiced={ischoiced} />
        <NameBox>{name}</NameBox>
      </ContentBox>
    </WholeLayout>
  );
};

export default ButtonSidebar;
