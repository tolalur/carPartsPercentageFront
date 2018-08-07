import { h, app } from "hyperapp"
import { AutoDoc } from "./autodoc"
import * as axios from "axios"

const state = {
    searchString: '',
    generalSearch: {
        autodoc: null,
        exist: []
    },
    targetSearch: {
        autodoc: {},
        exist: []
    },
    autodocId:''
};

const actions = {
    getState: () => state => state,
    setDetailNumber: value => ({ searchString: value }),
    generalSearch: () => (state, actions)  => {
        axios.get(`/api/general/${state.searchString}`)
            .then(function (response) {
                console.log(response.data);
                if (response.data) {
                    actions.setGeneralSearch(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    targetSearch: () => (state, actions) => {
        console.log('targetSearch, autodocId', state.autodocId);
        axios.get(`/api/target/${state.searchString}/${state.autodocId}`)
            .then((response) => {
                console.log('targetSearch response', response.data);
                if (response.data) {
                    actions.setTargetSearch(response.data);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    },
    setGeneralSearch: val => state => ({ generalSearch: val }),
    setTargetSearch: val => state => ({ targetSearch: val }),
    setAutodocId: val => state => ({autodocId: val}),

};

const Header = () => (
    <section class="hero">
        <div class="hero-body">
            <div class="level has-text-centered">
                <div class="container">
                    <h1 class="title">Сравнение цен на автозапчасти</h1>
                    <h2 class="subtitle">Поддерживаемые сервисы: Autodoc, Exist.</h2>
                </div>
            </div>
        </div>
    </section>
);

const Search = ({actions}) => (
    <div class="level has-text-centered">
        <div class="level-item has-text-centered">
            <div class="column is-three-quarters">
                <div class="field has-addons">
                    <p class="control is-expanded">
                        <input class="input" type="text" placeholder="Введите номер детали"
                            oninput={e => actions.setDetailNumber(e.target.value)}
                            onkeyup={e => (e.keyCode === 13 ? actions.generalSearch() : "")} />
                    </p>
                    <p class="control">
                        <a class="button is-info" 
                            onclick={() => actions.generalSearch()}>Поиск</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const view = (state, actions) => (
    <div class="container">
        <Header />
        <Search actions={actions} />
        <div class="tile is-ancestor">
            {state.generalSearch.autodoc === null ?
                <AutoDoc tableData={null} /> : ''}

            {state.generalSearch.autodoc && state.generalSearch.autodoc.length > 0 ?
                <AutoDoc tableData={state.generalSearch.autodoc} actions={actions} /> : ''}

            {state.targetSearch.autodoc && Object.keys(state.targetSearch.autodoc).length > 0 ?
                <AutoDoc 
                    targetSearch={state.targetSearch.autodoc}
                    actions={actions} /> 
                : ''}
        </div>
    </div>
)

app(state, actions, view, document.body);