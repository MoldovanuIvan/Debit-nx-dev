import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Flag from 'react-flagpack'
import {Trans} from "react-i18next";


export default function FadeMenu({changeLanguage}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (language) => {
        setAnchorEl(null);
        changeLanguage(language)
        if(language==='heb'){
            var b = document.querySelector("body")
            b.setAttribute('dir','rtl')
        }
        else{
            var b = document.querySelector("body")
            b.setAttribute('dir','ltr')
        }
    };


    return (
        <div>
            <Button style={{color: "white",}} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                <Trans i18nKey="description.part6">Language</Trans>
            </Button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={() => handleClose('en')}><Flag size="M" code="GB-ENG"/><span
                    style={{marginLeft: "8px",}}>English</span></MenuItem>
                <MenuItem onClick={() => handleClose('heb')}><Flag size="M" code="IL"/><span
                    style={{marginLeft: "8px",}}>ישראל</span></MenuItem>
            </Menu>
        </div>
    );
}