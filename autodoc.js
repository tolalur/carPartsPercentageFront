import { h } from "hyperapp"
const TableDataItem = ({ item, actions }) => (
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

const TargetSearchItem = ({ item, first }) => {
    console.log('item, first :', item, first);
    return (
    <div className={first ? 'box good-container' : 'good-container'}>
        <div class="good-name">
            <span><strong>{item.manufacturer.name}</strong> {item.partNumber}</span>
            <span class="subtitle">{item.name}</span>
        </div>
        <div>
            <span>от <strong>{item.minimalPrice} </strong>руб.</span>
        </div>
    </div>
)};

export const AutoDoc = ({ title, generalSearch, actions, targetSearch=null }) => {
    console.clear();
    console.log('generalSearch :', generalSearch);
    console.log('targetSearch :', targetSearch);
    const isItEmty = (item) => item && Object.keys(item).length == 0;
    return (
    <div class="tile is-parent">
        <div class="tile is-child">
            <div class="content box">
                <p class="title">{title}</p>
                {!generalSearch && isItEmty(targetSearch) ? <p class="subtitle">Нет предложений</p> : '' }
                <div class="content">
                    {(generalSearch && generalSearch.length > 0) && isItEmty(targetSearch) ? (
                        <ul>
                            {generalSearch.map(val => <TableDataItem item={val} actions={actions} />)}
                        </ul>
                    ) : ''}

                        {!isItEmty(targetSearch) ? (
                        <div>
                            <TargetSearchItem item={targetSearch.item} first={true} />
                            <div class="title" style={{'margin-bottom': 0}}> Аналоги </div>
                            {targetSearch.analogs.map(item => <TargetSearchItem item={item} />)}
                        </div>
                    ) : ''}
                </div>
            </div>
        </div>
    </div>
)};