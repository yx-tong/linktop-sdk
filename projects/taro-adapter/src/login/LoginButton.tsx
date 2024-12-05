import {Button, ButtonProps} from "@tarojs/components";
import React, {useEffect, useState} from "react";

interface LoginButtonCallbacks {
    onCheck: () => Promise<boolean>;
    onLogin: () => Promise<void>;
    onRegister: (e: ButtonProps.onGetPhoneNumberEventDetail) => Promise<void>;
}

export function LoginButton(props: LoginButtonCallbacks) {
    const [registered, setRegistered] = useState(false);

    async function setter() {
        setRegistered(await props.onCheck())
    }

    useEffect(() => {
        setter().then(r => r)
    }, []);

    if (registered) {
        return <Button onTap={props.onLogin}></Button>
    } else {
        return <Button openType="getPhoneNumber" onGetPhoneNumber={e => props.onRegister(e.detail)}></Button>
    }
}