--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" character varying(8) NOT NULL,
    url character varying(355) NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    id_user integer NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    token text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 'M8w6Sya0', 'http://www.maisum.com.br', 5, 1);
INSERT INTO public.urls VALUES (3, 'qxuzBDw9', 'http://www.sbt.com.br', 4, 5);
INSERT INTO public.urls VALUES (2, 'KZmCMkZE', 'http://www.globo.com', 9, 2);
INSERT INTO public.urls VALUES (4, 'AR-12EA6', 'http://www.record.com.br', 3, 4);
INSERT INTO public.urls VALUES (5, 'h0qYkQ-q', 'http://www.google.com.br', 17, 2);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Suzan', 'suzan@gmail.com', '$2b$10$7djd2RgOQpFmFpvNoJVfmephBKhcHVDnuZXE89leraNuRqlEQAqVS', '650c6554-6cbc-48d4-ab6d-f2b387316860');
INSERT INTO public.users VALUES (2, 'Gerson', 'gerson@gmail.com', '$2b$10$MDKLzsy8j4FajxHhn4Mub.jAQTo92QezIUf5ea1gw86Ux6VXxGigG', '8c4a9538-3283-4fb7-aea3-146dad5cf0dc');
INSERT INTO public.users VALUES (3, 'Rafaela', 'rafa@gmail.com', '$2b$10$CizziJfJQh1epVQJ2GVZ/.ecZOqzQJt4bh6hKle9snfVdxmkn4Rs.', 'e9d41e1a-8cc2-4638-8656-869b9e513742');
INSERT INTO public.users VALUES (5, 'Pedro', 'pedro@gmail.com', '$2b$10$CoJf4FiK7QTBWsobMNX7EuGmi8ugVfY8KHhTZqqUP/Pmvky47m6Jy', '200dd83a-239b-4a58-9505-635b7695888a');
INSERT INTO public.users VALUES (4, 'Bruno', 'bruno@gmail.com', '$2b$10$HNAxjKtfsPwplQKb8jPtUeJomTV9Dsjd7fuY7HJKq/8iC3bQ6DC..', 'a8284ac8-ca7f-4025-a105-5177bff8bc80');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

