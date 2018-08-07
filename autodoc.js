import { h } from "hyperapp"
const TableDataItem = ({ item, actions}) => (
    <li>
        <a href="" onclick={(e) => { 
            e.preventDefault(); 
            console.log('item:', item);
            actions.setAutodocId(item.id);
            actions.targetSearch();
        }}>
            {item.manufacturerName} - {item.partName}
        </a>
    </li>
);
const TargetSearch = ({ items, actions }) => {
    return items.map(item => <li>{key} - {item[key]}</li>);
    
};
export const AutoDoc = ({ tableData, actions, targetSearch=null }) => (
    <div class="tile is-parent">
        <div class="tile is-child">
            <div class="content box">
                <p class="title">Autodoc</p>
                {!tableData ? <p class="subtitle">Нет предложений</p> : '' }
                <div class="content">
                    {tableData && tableData.length > 0 ? (
                        <ul>
                            {tableData.map(val => <TableDataItem item={val} actions={actions} />)}
                        </ul>
                    ) : ''}

                    {targetSearch ? (
                        <TargetSearch items={targetSearch.analogs} actions={actions} />
                    ) : ''}
                </div>
            </div>
        </div>
    </div>
);