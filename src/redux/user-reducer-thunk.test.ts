// import {followSuccessAC, followTC, toggleIsFollowingProgress} from "./users-reducer"
// import {ResultCodeEnum, usersAPI, UsersPostDeleteType} from '../Api/Api'

// jest.mock('../Api/Api')

// const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

// const result: UsersPostDeleteType = {
//     resultCode: ResultCodeEnum.Success,
//     messages: [],
//     data: {}
// }

// usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
// test('', () => {
   
//      const thunk = followTC(1)
//      const dispatchMock = jest.fn()
//      thunk(dispatchMock)
//      expect(dispatchMock).toBeCalledTimes(3)
//      expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFollowingProgress(true, 1))
//      expect(dispatchMock).toHaveBeenNthCalledWith(2, followSuccessAC(1))
//      expect(dispatchMock).toHaveBeenNthCalledWith(3,  toggleIsFollowingProgress(false, 1))


// })