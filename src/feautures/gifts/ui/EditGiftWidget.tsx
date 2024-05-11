import { Dispatch, useEffect, useReducer } from "react"
import { Gift } from "../gift.dto"
import { useChangeGift, useUploadGiftImage } from "../giftAPI";
import { CircularProgress, TextField } from "@mui/material";
import { title } from "process";
import { Link } from "react-router-dom";


function useEditGift({ gift }: { gift: Gift }) {
    const [giftState, dispatch] = useReducer(function (state: Gift, action: Partial<Gift>) {
        return {
            ...state,
            ...action,
            id: state.id
        }
    }, { ...gift });

    const [updateGift, giftMetadata] = useChangeGift();
    const [changeImage, imageMetadata] = useUploadGiftImage();

    useEffect(() => {

    }, [giftState]);

    return {
        giftState,
        dispatch,
        metadata: {
            loading: giftMetadata.isLoading || imageMetadata.isLoading
        }
    }
}
