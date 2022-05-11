import { RecoilRoot } from 'recoil';
import CharacterCounter from './CharacterCounter';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from '@emotion/styled';

const queryClient = new QueryClient();

const StyledApp = styled.div`
  display: block;
  max-width: 100vw;
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <StyledApp>
          <CharacterCounter/>
        </StyledApp>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
