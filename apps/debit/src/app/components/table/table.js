import React from "react";
import EnhancedTable from "./tableMaterial";
import {Trans, useTranslation} from "react-i18next";

const Table = () => {
    const {i18n} = useTranslation()
    return (
        <div>
            <p><h2><Trans i18nKey="description.part14">Data Grid</Trans></h2></p>
            <EnhancedTable />
        </div>
    )
}

export default Table