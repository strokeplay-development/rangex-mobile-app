import { MemoryRouter } from "react-router-dom";
import EditProfilePage from "../../pages/profile/EditProfilePage";
import { themeWrapper } from "../common";
import recoil from 'recoil';
import router from 'react-router-dom';
import { User } from "../../types";
import { fireEvent, render, screen } from "@testing-library/react";
import { PATHS } from "../../constants";

// React Router Fns Mocking
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));
// Recoil Fns Mocking
jest.mock('recoil');

describe('EditProfilePage', () => {
    const mockedNavigate = jest.fn();

    beforeEach(() => {
        // Mock useRecoilValue
        jest.spyOn(recoil, 'useRecoilValue').mockImplementation((): User => ({
            zipCode: '34543',
            address1: '서울시',
            address2: '봉천동',
            birthday: '2020-12-31T12:34:33.000Z',
            dialingCode: '+82',
            email: 'dfnupvk@kakao.com',
            gender: 0,
            name: 'Mrkim',
            nickName: 'mc kim',
            phoneNumber: '01023459988',
        }));

        // Mock useNavigate
        jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedNavigate);

        render(
            <MemoryRouter>
                <EditProfilePage/>
            </MemoryRouter>,
            { wrapper: themeWrapper }
        );
    });

    test('프로필 정보가 렌더링 된다.', () => {
        expect(screen.getByRole('info:name', {description: 'Mrkim'})).toBeInTheDocument();
        expect(screen.getByRole('info:nickname', {description: 'mc kim'})).toBeInTheDocument();
        expect(screen.getByRole('info:phone', {description: '01023459988'})).toBeInTheDocument();
        expect(screen.getByRole('info:email', {description: 'dfnupvk@kakao.com'})).toBeInTheDocument();
        expect(screen.getByRole('info:gender', {description: 'MALE'})).toBeInTheDocument();
        expect(screen.getByRole('info:birthday', {description: '2020-12-31'})).toBeInTheDocument();
        expect(screen.getByRole('info:address', {description: '서울시, 봉천동'})).toBeInTheDocument();
    });

    test('닉네임, 비밀번호, 로그아웃 메뉴버튼이 렌더링된다.', () => {
        expect(screen.getByRole('menu:edit-nickname')).toBeInTheDocument();
        expect(screen.getByRole('menu:edit-password')).toBeInTheDocument();
        expect(screen.getByRole('menu:logout')).toBeInTheDocument();
    });

    test("'Edit'버튼을 누르면 프로질정보 수정 페이지로 이동한다.", () => {
        fireEvent.click(screen.getByRole('button:edit'));
        expect(mockedNavigate).toHaveBeenCalledWith(PATHS.PROFILE.OPTIONAL);
    });

    test('닉네임, 비밀번호 메뉴버튼을 클릭하면 해당 페이지로 이동한다.', () => {
        // Edit Nick name
        fireEvent.click(screen.getByRole('menu:edit-nickname'));
        expect(mockedNavigate).toHaveBeenCalledWith(PATHS.PROFILE.NICKNAME);

        // Edit Password
        fireEvent.click(screen.getByRole('menu:edit-password'));
        expect(mockedNavigate).toHaveBeenCalledWith(PATHS.PROFILE.PASSWORD);
    });
});