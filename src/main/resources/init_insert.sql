insert into pais(nome, sigla) values('Brasil', 'BR');
insert into pais(nome, sigla) values('Estados Unidos da America', 'EUA');
insert into estado(nome, uf, id_pais) values('Goias', 'GO', 1);
insert into cidade(nome, id_estado) values('Goiania', 1);
insert into cidade(nome, id_estado) values('Aparecida de Goiania', 1);
insert into bairro(nome, id_cidade) values('Jardim Presidente', 1);
insert into bairro(nome, id_cidade) values('Jardim Curitiba', 1);
insert into bairro(nome, id_cidade) values('Bairro Floresta', 1);
insert into bairro(nome, id_cidade) values('Garavelo', 2);

insert into marcas_carro(nome) values('CHEVROLET');
insert into marcas_carro(nome) values('FIAT');
insert into marcas_carro(nome) values('VOLKSWAGEM');
insert into marcas_carro(nome) values('FORD');

insert into modelos_carro(nome,id_marca_carro) values('ONIX',1);
insert into modelos_carro(nome,id_marca_carro) values('PRISMA',1);
insert into modelos_carro(nome,id_marca_carro) values('CRUZE',1);
insert into modelos_carro(nome,id_marca_carro) values('ARGO',2);
insert into modelos_carro(nome,id_marca_carro) values('PALIO',2);
insert into modelos_carro(nome,id_marca_carro) values('STRADA',2);
insert into modelos_carro(nome,id_marca_carro) values('TORO',2);
insert into modelos_carro(nome,id_marca_carro) values('GOL',3);
insert into modelos_carro(nome,id_marca_carro) values('POLO',3);
insert into modelos_carro(nome,id_marca_carro) values('AMAROK V6',3);
insert into modelos_carro(nome,id_marca_carro) values('GOLF',3);
insert into modelos_carro(nome,id_marca_carro) values('KA',4);
insert into modelos_carro(nome,id_marca_carro) values('KA SE',4);
insert into modelos_carro(nome,id_marca_carro) values('FOCUS',4);
insert into modelos_carro(nome,id_marca_carro) values('FUSION',4);


--Insert menu
insert into menu(nome_menu, url) VALUES('Flyer',null);
insert into menu(nome_menu, url) VALUES('Resident',null);
insert into menu(nome_menu, url) VALUES('Link Flyer','flyer/link');


--Insert menu-item
insert into menu_item(nome_menu_item, url_menu_item,id_menu) VALUES('New Flyer','flyer',1);
insert into menu_item(nome_menu_item, url_menu_item,id_menu) VALUES('Search Flyer','flyer/page/search',1);
insert into menu_item(nome_menu_item, url_menu_item,id_menu) VALUES('New Resident','resident',2);
insert into menu_item(nome_menu_item, url_menu_item,id_menu) VALUES('Search Resident','resident/page/search',2);
