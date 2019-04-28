// Fake API
let fetchFakeAuth = (url, data) => {
    return new Promise((res, rej) => {
        res({
            key: '89019530-e459-470e-93e8-0eddf705a6c8',
            token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFeHBlcmllc0F0IjoxNTUyNzQxMzI0LCJBY2NvdW50SUQiOjQwMzgzNiwiSXNTdGFmZiI6ZmFsc2UsIlVzZXJQaG9uZSI6Iis3MDAwMDAwMzAwMyJ9.56RBv08QHeHuA-gSngQf9rVHsSx5UU2Uz4z09wMsYLg',
        });
    });
};

let fetchFakeBalance = (url, data) => {
    return new Promise((res, rej) => {
        res({
            balance_amt: 1100,
        });
    });
};

export class Auth {
    constructor(element, title, inputs, baseUrlAPI) {
        this.element = element;
        this.title = title;
        this.inputs = inputs;
        this.baseUrlAPI = baseUrlAPI;

        this._render();
        this.sendForm();
    }

    _render() {
        this.element.innerHTML = `
            <h2 class="title">${this.title}</h2>
            <form action="" method="post">
                ${this.inputs
                    .map(({ name, type }) => `
                        <div class="field">
                            <label class="label">${name}</label>
                            <div class="control">
                            <input class="input" type="${type}" name="${name}" placeholder="${name}">
                            </div>
                        </div>
                `,).join('')}

                <button class="button is-primary is-outlined" type="submit">Отправить</button>
            </form>

        `;
    }

    sendForm() {
        const form = this.element.querySelector('form');

        form.addEventListener('submit', e => {
            e.preventDefault();

            let formData = new FormData(form),
                data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            fetchFakeAuth(`${this.baseUrlAPI}/login`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
            })
                .then(res => {
                    let { token } = res;

                    return fetchFakeBalance(
                        `${this.baseUrlAPI}/account/balance`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: token,
                            },
                            method: 'POST',
                            body: JSON.stringify(data),
                        },
                    );
                })
                .then(res => {
                    let { balance_amt } = res;
                    alert(`Ваш баланс: ${balance_amt}`);
                })
                .catch(res => {
                    console.log('res', res);
                });
        });
    }
}
