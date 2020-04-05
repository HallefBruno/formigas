--insert grupo
INSERT INTO grupo (nome) VALUES ('Administrador');
INSERT INTO grupo (nome) VALUES ('Atendente');
--insert permissao
INSERT INTO permissao (nome) VALUES ('CADASTRAR');
INSERT INTO permissao (nome) VALUES ('PESQUISAR');
--insert grupo-permissao
INSERT INTO grupo_permissao (id_grupo, id_permissao) VALUES (1, 1);
INSERT INTO grupo_permissao (id_grupo, id_permissao) VALUES (2, 2);
