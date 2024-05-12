import { Button } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { Gift } from "../gift.dto";


export function CopyWishlistButton({ gifts }: { gifts: Gift[] }) {

    const handleClick = () => {
        const lines = new Array();
        gifts.forEach(gift => lines.push(`* ${gift.title}`));

        const result = lines.join('\n');
        navigator.clipboard.writeText(result);
    }

    return (
        <Button
            color="info"
            onClick={handleClick}
            endIcon={<ContentCopyIcon />}
            variant="outlined"
            sx={{
                alignSelf: 'flex-end',
                marginTop: '30px'
            }}
        >
            Скопировать
        </Button>
    )
}