import React from 'react';
import styled from 'styled-components';

const PrivacyNoticeContainer = styled.div`
  padding: 2rem;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Section = styled.section`
  margin-bottom: 1.5rem;
`;

const PrivacyNotice: React.FC = () => {
  return (
    <PrivacyNoticeContainer>
      <Title>개인정보 사용에 대한 고지</Title>
      
      <Section>
        <h2>1. 개인정보 사용 목적</h2>
        <p>
          저희 Core 페이지에서는 서비스 제공 및 개선을 위해 다음과 같은 개인정보를 사용하고 있습니다.
        </p>
      </Section>

      <Section>
        <h2>2. 수집하는 개인정보</h2>
        <ul>
          <li>지라 개인 프로필 정보</li>
          <li>지라 그룹 목록</li>
          <li>프로젝트 목록</li>
          <li>이슈 등록, 삭제, 수정, 조회 기능</li>
        </ul>
      </Section>

      <Section>
        <h2>3. 개인정보의 사용 및 보안</h2>
        <p>
          사용자의 개인정보는 안전하게 관리되며, 서비스 제공을 위해서만 사용됩니다. 제3자에게 공유되지 않으며 보안 관리에 최선을 다하고 있습니다.
        </p>
      </Section>

      <Section>
        <h2>4. 개인정보 보유 기간</h2>
        <p>
          개인정보는 서비스 이용 중에는 계속 보유되며, 서비스 이용 종료 시 적절한 절차에 따라 파기됩니다.
        </p>
      </Section>

      <Section>
        <h2>5. 사용자 권리</h2>
        <p>
          사용자는 언제든지 개인정보에 대한 열람, 수정, 삭제 요청을 할 수 있습니다. 문의 사항이 있을 경우 고객 지원에 문의 바랍니다.
        </p>
      </Section>
    </PrivacyNoticeContainer>
  );
};

export default PrivacyNotice;
