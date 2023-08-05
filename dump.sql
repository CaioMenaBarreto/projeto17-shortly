--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

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
-- Name: ranking; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ranking (
    id integer NOT NULL,
    name text NOT NULL,
    "linksCount" integer DEFAULT 0 NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: ranking_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ranking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ranking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ranking_id_seq OWNED BY public.ranking.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    "userId" integer NOT NULL,
    shorturl text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    url text NOT NULL,
    id integer NOT NULL,
    visits integer DEFAULT 0 NOT NULL
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
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
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
-- Name: ranking id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ranking ALTER COLUMN id SET DEFAULT nextval('public.ranking_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ranking; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.ranking VALUES (2, 'Caio', 1, 14, '2023-08-05 02:56:09.281088');
INSERT INTO public.ranking VALUES (1, 'João', 13, 2, '2023-08-05 02:56:09.281088');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 'b65fecde-9214-41e6-942a-de446f725139', 1, '2023-08-02 22:43:27.336639');
INSERT INTO public.sessions VALUES (2, 'c23ff755-4373-4594-9e59-a14b684064a4', 1, '2023-08-03 17:43:18.21789');
INSERT INTO public.sessions VALUES (3, '73ef4f78-1f75-47ce-accd-50bd0907f899', 2, '2023-08-05 02:20:14.843774');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 'moV3vFDn', '2023-08-03 21:09:39.893234', 'https://www.driven.com.br/', 1, 0);
INSERT INTO public.urls VALUES (1, 'Mz33hHxi', '2023-08-03 21:15:44.807537', 'https://www.youtube.com.br/', 4, 0);
INSERT INTO public.urls VALUES (1, 'Wlb-jYoq', '2023-08-03 21:18:17.781741', 'https://www.discord.com.br/', 5, 0);
INSERT INTO public.urls VALUES (1, 'q_vbGjsW', '2023-08-03 21:22:05.117824', 'https://www.zoom.com.br/', 8, 1);
INSERT INTO public.urls VALUES (1, 'oy6TuEKF', '2023-08-04 18:39:19.440371', 'https://www.detran.com.br/', 11, 0);
INSERT INTO public.urls VALUES (1, '4Sv9mBZ9', '2023-08-04 18:43:06.885196', 'https://www.fisk.com.br/', 14, 0);
INSERT INTO public.urls VALUES (1, '1_kwKwls', '2023-08-04 18:44:07.409839', 'https://www.cna.com.br/', 15, 0);
INSERT INTO public.urls VALUES (1, 'X7YPiMr5', '2023-08-04 18:45:02.173961', 'https://www.nivea.com.br/', 16, 0);
INSERT INTO public.urls VALUES (1, 'efvBOOn8', '2023-08-04 18:45:20.288327', 'https://www.rexona.com.br/', 17, 0);
INSERT INTO public.urls VALUES (1, 'zCWIVFmo', '2023-08-04 18:47:34.930873', 'https://www.carrefour.com.br/', 18, 0);
INSERT INTO public.urls VALUES (1, 'wcoZ77A6', '2023-08-04 18:50:34.576703', 'https://www.extra.com.br/', 20, 0);
INSERT INTO public.urls VALUES (1, 'wd7AEw6E', '2023-08-04 18:51:44.365815', 'https://www.samsung.com.br/', 22, 0);
INSERT INTO public.urls VALUES (1, 'nwZgoeoO', '2023-08-04 18:38:53.91167', 'https://www.steam.com.br/', 9, 1);
INSERT INTO public.urls VALUES (2, '1W2F7W6O', '2023-08-05 02:22:21.409897', 'https://gmail.com.br', 23, 14);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$10$zJj7RNkWS9NDcS3rJRsFDu8JYzGkqsiRD9udyPGaZzcz6.8L.A7TO', '2023-08-02 19:47:52.090364');
INSERT INTO public.users VALUES (2, 'Caio', 'caio@gmail.com.br', '$2b$10$COxKvVpr/WeazTeuXsk6.u4Ha/D5amMaTZi7vTcXOETz7ACfXqUhy', '2023-08-05 02:19:55.495605');


--
-- Name: ranking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ranking_id_seq', 1, false);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 23, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: urls links_link_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT links_link_key UNIQUE (shorturl);


--
-- Name: ranking ranking_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ranking
    ADD CONSTRAINT ranking_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_url_key UNIQUE (url);


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
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_table_id_asc; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_table_id_asc ON public.urls USING btree (id);


--
-- Name: urls links_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

