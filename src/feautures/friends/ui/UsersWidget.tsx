import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProfileInfo, useGetUsersBySearch } from "../../profile/profileAPI";
import { UserInfo } from "../../profile/profile.dto";
import { FriendButton } from "./FriendButtons";

export function FindFriend() {
    const navigate = useNavigate();

    return (
        <Button
            variant="outlined"
            onClick={() => navigate('/users')}
        >
            Найти друга
        </Button>
    )
}

export function UsersWidget() {
    const [input, setInput] = useState('');
    const currentUser = useGetProfileInfo({}).data;
    const users = useGetUsersBySearch(input).data?.filter(value => value.id !== currentUser?.id);

    if (!users) {
        return (<p>Загрузка...</p>)
    }

    return (
        <div
            style={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                margin: '40px auto'
            }}>

            <TextField
                variant='standard'
                fullWidth
                inputProps={{
                    style: {
                        fontSize: '24px'
                    }
                }}
                placeholder="Найдите пользователя по логину."

                value={input}
                onChange={e => setInput(e.target.value)}
            />

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '35px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '40px 0'
                }}
            >
                {
                    users && users.length > 0
                        ? users.map(user => <UserLine key={user.id} user={user} />)
                        : <p>Нет пользователей.</p>
                }
            </div>
        </div>
    )
}

function UserLine({ user }: { user: UserInfo }) {
    return (
        <div style={{ width: '400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {user.login}
            <FriendButton userId={user.id} />
        </div>
    )
}