import { h } from 'hyperapp';
const GeneralSearchItem = ({ item, actions }) => (
  <li>
    <a href="" onclick={(e) => {
      e.preventDefault();
      console.log('item:', item);
      actions.setAutodocId(item.id);
      actions.autoDocTargetSearch();
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
  );
};

export const ShowSearchResult = ({ title, generalSearch, actions, targetSearch }) => {
  console.clear();
  console.log('generalSearch :', generalSearch);
  console.log('targetSearch :', targetSearch);

  const isItNotEmptyObj = (item) => !!item && !!Object.keys(item).length;
  const Title = ({ title, actions, isTargetSearch = false }) => {
    console.log('isTargetSearch :', isTargetSearch);
    return (
      <p class="title flex f-align-f-e f-justify-content-s-b">
        <span>{title}</span>
        {isTargetSearch &&
          (<a class="button is-light is-small" onclick={e => {
            e.preventDefault();
            console.log('generalSearch :', generalSearch);
            actions.setTargetSearch({});
          }}>Назад</a>)}
      </p>
    )
  }
  return (
    <div class="tile is-parent">
      <div class="tile is-child">
        <div class="content box">
          <Title title={title} actions={actions} isTargetSearch={isItNotEmptyObj(targetSearch)} />
          {(!generalSearch && isItNotEmptyObj(targetSearch)) && <p class="subtitle">Нет предложений</p>}
          <div class="content">
            {
              !!((generalSearch && generalSearch.length) && !isItNotEmptyObj(targetSearch))
              &&
              (<ul>{generalSearch.map(val => <GeneralSearchItem item={val} actions={actions} />)}</ul>)
            }
            {
              isItNotEmptyObj(targetSearch) &&
              (<div>
                <TargetSearchItem item={targetSearch.item} first={true} />
                <div class="title" style={{ 'margin-bottom': 0 }}> Аналоги </div>
                {targetSearch.analogs.map(item => <TargetSearchItem item={item} />)}
              </div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};