import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { UserInfo } from "../profile.dto";
import { FriendButton } from "../../friends/ui/FriendButtons";
import { WithUserRelation } from "../helpers/WithUserRelation";


// export function ProfileHeaderButtonCopy({ user }: { user: UserInfo }) {
//     const userRelationStatus = useContext(UserRelationStatusContext);
//     const navigate = useNavigate();

//     if (userRelationStatus === UserRelationStatus.Me) {
//         return (<Button variant="outlined" onClick={() => navigate('/settings')}>Редактировать профиль</Button>);
//     } else {
//         return (<FriendButton userId={user.id} />)
//     }
// }

export function ProfileHeaderButton({ user }: { user: UserInfo }) {
    const navigate = useNavigate();

    return (
        <WithUserRelation 
            renderMe={() => (<Button variant="outlined" onClick={() => navigate('/settings')}>Редактировать профиль</Button>)}
            renderFriend={() => (<FriendButton userId={user.id} />)}
            renderNone={() => (<FriendButton userId={user.id} />)}
        />
    )
}