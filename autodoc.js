import { h } from "hyperapp"

export const AutoDoc = ({ tableData }) => (
    tableData && tableData.length > 0 ? (
        <div class="u-full-width data-body">
            <h4>Autodoc</h4>
            <ul>
                {tableData.map(val => <li onclick={(val) => { console.log('val:', val)}}>{val.manufacturerName} - {val.partName}</li>)}
            </ul>
        </div>        
        ) : (
            <div class="u-full-width">
                <h4 class="data-body">Autodoc - нет предложений</h4>
            </div>
        )
);