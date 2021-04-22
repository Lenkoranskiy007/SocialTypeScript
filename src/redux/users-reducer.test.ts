import { usersReducer, followSuccessAC, InitialStateType , unFollowSuccessAC} from "./users-reducer"


let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'Farid', followed: false,  photos: {small: null, large: null}, status: 'status 0',totalCount: 0, error: 'sasa'},
            {id: 1, name: 'Farid', followed: false,  photos: {small: null, large: null}, status: 'status 0', totalCount: 1, error: 'sasa'},
            {id: 2, name: 'Farid', followed: true,  photos: {small: null, large: null} , status: 'status 0',totalCount: 2, error: 'sasa'},
            {id: 3, name: 'Farid', followed: true,  photos: {small: null, large: null} , status: 'status 0',totalCount: 3,  error: 'sasa'}, 
        ],
        pageSize: 5,
        totalCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [] as Array<number>
    }
    }
)

test("follow success", () => {

const newState = usersReducer(state, followSuccessAC(1))

expect(newState.users[0].followed).toBeFalsy()
expect(newState.users[1].followed).toBeTruthy()
})



test("unFollow  success", () => {

    const newState = usersReducer(state, unFollowSuccessAC(3))
    
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
    })
    

