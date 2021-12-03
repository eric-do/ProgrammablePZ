--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Ubuntu 13.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.0

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

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--
DROP DATABASE IF EXISTS ppz;
CREATE DATABASE ppz;
\c ppz

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ride_ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ride_ratings (
    id integer NOT NULL,
    user_id uuid,
    ride_id integer,
    rating smallint,
    difficulty smallint,
    CONSTRAINT ride_ratings_difficulty_check CHECK (((difficulty >= 1) AND (difficulty <= 5))),
    CONSTRAINT ride_ratings_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.ride_ratings OWNER TO postgres;

--
-- Name: ride_ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.ride_ratings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ride_ratings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: ride_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ride_types (
    type character varying(5) NOT NULL,
    name character varying(30)
);


ALTER TABLE public.ride_types OWNER TO postgres;

--
-- Name: rides; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rides (
    id integer NOT NULL,
    creator_id uuid,
    title text,
    type character varying(5),
    likes integer DEFAULT 0,
    dislikes integer DEFAULT 0,
    total_votes integer DEFAULT 0,
    ride_count integer DEFAULT 0,
    intervals jsonb NOT NULL,
    timeinseconds smallint NOT NULL,
    created_on timestamp with time zone DEFAULT now(),
    rating numeric DEFAULT 5.0,
    difficulty numeric
);


ALTER TABLE public.rides OWNER TO postgres;

--
-- Name: rides_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.rides ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rides_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user_follows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_follows (
    id integer NOT NULL,
    user_id uuid NOT NULL,
    friend_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.user_follows OWNER TO postgres;

--
-- Name: user_follows_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.user_follows ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_follows_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user_likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_likes (
    ride_id integer NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.user_likes OWNER TO postgres;

--
-- Name: user_rides; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_rides (
    id integer NOT NULL,
    user_id uuid,
    ride_id integer,
    ridden_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.user_rides OWNER TO postgres;

--
-- Name: user_rides_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.user_rides ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_rides_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    admin boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: ride_ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ride_ratings (id, user_id, ride_id, rating, difficulty) FROM stdin;
1	9a54c094-8542-4b0a-90d5-97c1e34413a0	425	4	4
\.


--
-- Data for Name: ride_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ride_types (type, name) FROM stdin;
pz	Power Zone
pze	Power Zone Endurance
pzm	Power Zone Max
ftp	Power Zone FTP
\.


--
-- Data for Name: rides; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rides (id, creator_id, title, type, likes, dislikes, total_votes, ride_count, intervals, timeinseconds, created_on, rating, difficulty) FROM stdin;
1	\N	High Fives All Around!	pz	130	0	140	234	[{"zone": 1, "length": 180}, {"zone": 2, "length": 30}, {"zone": 1, "length": 30}, {"zone": 2, "length": 30}, {"zone": 1, "length": 30}, {"zone": 2, "length": 30}, {"zone": 1, "length": 60}, {"zone": 3, "length": 60}, {"zone": 4, "length": 60}, {"zone": 5, "length": 60}, {"zone": 1, "length": 60}, {"zone": 5, "length": 120}, {"zone": 1, "length": 120}, {"zone": 5, "length": 120}, {"zone": 1, "length": 120}, {"zone": 5, "length": 120}, {"zone": 1, "length": 120}, {"zone": 5, "length": 120}, {"zone": 1, "length": 120}, {"zone": 5, "length": 120}, {"zone": 1, "length": 90}]	1800	2021-09-26 21:41:25.536476+00	5.0	\N
2	\N	Power Zone Pyramid	pz	100	0	105	345	[{"zone": 1, "length": 180}, {"zone": 2, "length": 30}, {"zone": 1, "length": 30}, {"zone": 2, "length": 30}, {"zone": 1, "length": 30}, {"zone": 2, "length": 30}, {"zone": 1, "length": 30}, {"zone": 2, "length": 30}, {"zone": 1, "length": 30}, {"zone": 3, "length": 60}, {"zone": 4, "length": 60}, {"zone": 5, "length": 60}, {"zone": 1, "length": 60}, {"zone": 4, "length": 180}, {"zone": 1, "length": 60}, {"zone": 4, "length": 180}, {"zone": 1, "length": 60}, {"zone": 5, "length": 120}, {"zone": 1, "length": 60}, {"zone": 5, "length": 120}, {"zone": 1, "length": 60}, {"zone": 6, "length": 60}, {"zone": 1, "length": 60}, {"zone": 6, "length": 60}, {"zone": 1, "length": 60}, {"zone": 5, "length": 120}, {"zone": 1, "length": 60}, {"zone": 5, "length": 120}, {"zone": 1, "length": 60}, {"zone": 4, "length": 180}, {"zone": 1, "length": 60}, {"zone": 4, "length": 180}, {"zone": 1, "length": 60}]	2700	2021-09-26 21:41:25.53751+00	5.0	\N
4	\N	PZ Max Canyon	pzm	400	0	407	765	[{"zone": 1, "length": 180}, {"zone": 2, "length": 30}, {"zone": 1, "length": 30}, {"zone": 2, "length": 30}, {"zone": 1, "length": 30}, {"zone": 2, "length": 60}, {"zone": 3, "length": 60}, {"zone": 4, "length": 60}, {"zone": 5, "length": 30}, {"zone": 6, "length": 30}, {"zone": 1, "length": 120}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 180}, {"zone": 6, "length": 30}, {"zone": 1, "length": 15}, {"zone": 6, "length": 30}, {"zone": 1, "length": 15}, {"zone": 6, "length": 30}, {"zone": 1, "length": 15}, {"zone": 6, "length": 30}, {"zone": 1, "length": 15}, {"zone": 6, "length": 30}, {"zone": 1, "length": 15}, {"zone": 6, "length": 30}, {"zone": 1, "length": 180}, {"zone": 6, "length": 45}, {"zone": 1, "length": 15}, {"zone": 6, "length": 45}, {"zone": 1, "length": 15}, {"zone": 6, "length": 45}, {"zone": 1, "length": 15}, {"zone": 6, "length": 45}, {"zone": 1, "length": 180}, {"zone": 6, "length": 30}, {"zone": 1, "length": 15}, {"zone": 6, "length": 30}, {"zone": 1, "length": 15}, {"zone": 6, "length": 30}, {"zone": 1, "length": 15}, {"zone": 6, "length": 30}, {"zone": 1, "length": 15}, {"zone": 6, "length": 30}, {"zone": 1, "length": 15}, {"zone": 6, "length": 30}, {"zone": 1, "length": 180}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 15}, {"zone": 7, "length": 15}, {"zone": 1, "length": 60}]	2700	2021-09-26 21:41:25.537974+00	5.0	\N
423	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ 3-1	pz	0	0	0	0	[{"zone": 1, "length": 780}, {"zone": 4, "length": 300}, {"zone": 1, "length": 120}, {"zone": 5, "length": 120}, {"zone": 2, "length": 60}, {"zone": 5, "length": 120}, {"zone": 2, "length": 60}, {"zone": 5, "length": 120}, {"zone": 1, "length": 120}, {"zone": 4, "length": 300}, {"zone": 1, "length": 120}, {"zone": 5, "length": 120}, {"zone": 2, "length": 60}, {"zone": 5, "length": 120}, {"zone": 2, "length": 60}, {"zone": 5, "length": 120}]	2700	2021-11-02 01:48:19.231146+00	5.0	\N
3	\N	3 for 5, 2 for 3	pze	300	0	350	401	[{"zone": 1, "length": 240}, {"zone": 2, "length": 30}, {"zone": 1, "length": 30}, {"zone": 2, "length": 30}, {"zone": 1, "length": 30}, {"zone": 2, "length": 60}, {"zone": 3, "length": 60}, {"zone": 1, "length": 60}, {"zone": 3, "length": 300}, {"zone": 2, "length": 180}, {"zone": 3, "length": 300}, {"zone": 2, "length": 180}, {"zone": 3, "length": 300}]	1800	2021-09-26 21:41:25.53722+00	5.0	\N
434	9a54c094-8542-4b0a-90d5-97c1e34413a0	Denis 11/16/21	\N	0	0	0	0	[{"zone": 1, "length": 780}, {"zone": 3, "length": 180}, {"zone": 4, "length": 180}, {"zone": 1, "length": 180}, {"zone": 3, "length": 240}, {"zone": 4, "length": 240}, {"zone": 1, "length": 240}, {"zone": 3, "length": 300}, {"zone": 4, "length": 300}, {"zone": 1, "length": 60}]	2700	2021-12-02 02:31:21.823184+00	5.0	\N
5	\N	Flat Twos	pze	600	0	640	380	[{"zone": 1, "length": 180}, {"zone": 2, "length": 30}, {"zone": 1, "length": 30}, {"zone": 2, "length": 30}, {"zone": 1, "length": 30}, {"zone": 2, "length": 120}, {"zone": 1, "length": 60}, {"zone": 2, "length": 2200}]	2700	2021-09-26 21:41:25.538256+00	5.0	\N
424	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ 3-2	pz	0	0	0	1	[{"zone": 1, "length": 780}, {"zone": 3, "length": 360}, {"zone": 4, "length": 300}, {"zone": 1, "length": 120}, {"zone": 3, "length": 300}, {"zone": 4, "length": 240}, {"zone": 1, "length": 120}, {"zone": 3, "length": 240}, {"zone": 4, "length": 180}, {"zone": 1, "length": 60}]	2700	2021-11-03 05:56:20.191257+00	5.0	\N
426	873e9c8e-550c-46d2-aa34-93ec61f03954	3 for 5, 2 for 2	pze	0	0	0	0	[{"zone": 1, "length": 180}, {"zone": 2, "length": 180}, {"zone": 3, "length": 180}, {"zone": 1, "length": 60}, {"zone": 3, "length": 300}, {"zone": 2, "length": 120}, {"zone": 3, "length": 300}, {"zone": 2, "length": 120}, {"zone": 3, "length": 300}, {"zone": 1, "length": 60}]	1800	2021-11-05 15:31:11.348095+00	5.0	\N
429	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ 4-2	pz	0	0	0	0	[{"zone": 1, "length": 780}, {"zone": 3, "length": 120}, {"zone": 4, "length": 120}, {"zone": 3, "length": 120}, {"zone": 5, "length": 60}, {"zone": 3, "length": 120}, {"zone": 4, "length": 120}, {"zone": 3, "length": 120}, {"zone": 5, "length": 60}, {"zone": 1, "length": 180}, {"zone": 3, "length": 120}, {"zone": 4, "length": 120}, {"zone": 3, "length": 120}, {"zone": 5, "length": 60}, {"zone": 3, "length": 120}, {"zone": 4, "length": 120}, {"zone": 3, "length": 120}, {"zone": 5, "length": 60}, {"zone": 1, "length": 60}]	2700	2021-11-11 01:09:23.393808+00	5.0	\N
413	873e9c8e-550c-46d2-aa34-93ec61f03954	5 for 2, 2 for 2	pz	0	0	0	1	[{"zone": 1, "length": 180}, {"zone": 2, "length": 180}, {"zone": 3, "length": 60}, {"zone": 4, "length": 60}, {"zone": 5, "length": 60}, {"zone": 1, "length": 60}, {"zone": 5, "length": 120}, {"zone": 1, "length": 120}, {"zone": 5, "length": 120}, {"zone": 1, "length": 120}, {"zone": 5, "length": 120}, {"zone": 1, "length": 120}, {"zone": 5, "length": 120}, {"zone": 1, "length": 120}, {"zone": 5, "length": 120}, {"zone": 1, "length": 120}]	1800	2021-10-12 20:18:32.500914+00	5.0	\N
425	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ Endurance 3-3	pze	0	0	0	2	[{"zone": 1, "length": 780}, {"zone": 3, "length": 480}, {"zone": 2, "length": 120}, {"zone": 3, "length": 360}, {"zone": 2, "length": 120}, {"zone": 3, "length": 240}, {"zone": 2, "length": 120}, {"zone": 3, "length": 480}, {"zone": 2, "length": 120}, {"zone": 3, "length": 360}, {"zone": 2, "length": 120}, {"zone": 3, "length": 240}, {"zone": 1, "length": 60}]	3600	2021-11-03 18:11:16.0068+00	5.0	\N
409	873e9c8e-550c-46d2-aa34-93ec61f03954	45 Minute PZ Ride	pz	0	0	0	1	[{"zone": 1, "length": 180}, {"zone": 2, "length": 180}, {"zone": 1, "length": 60}, {"zone": 3, "length": 60}, {"zone": 4, "length": 60}, {"zone": 5, "length": 60}, {"zone": 1, "length": 60}, {"zone": 5, "length": 60}, {"zone": 3, "length": 120}, {"zone": 5, "length": 60}, {"zone": 3, "length": 120}, {"zone": 5, "length": 60}, {"zone": 1, "length": 180}, {"zone": 5, "length": 60}, {"zone": 3, "length": 180}, {"zone": 5, "length": 60}, {"zone": 3, "length": 180}, {"zone": 5, "length": 60}, {"zone": 1, "length": 180}, {"zone": 5, "length": 60}, {"zone": 3, "length": 180}, {"zone": 5, "length": 60}, {"zone": 3, "length": 180}, {"zone": 5, "length": 60}, {"zone": 1, "length": 180}]	2700	2021-10-04 18:54:10.91818+00	5.0	\N
415	873e9c8e-550c-46d2-aa34-93ec61f03954	3-4-5 PZE Pyramid	pz	0	0	0	5	[{"zone": 1, "length": 180}, {"zone": 2, "length": 180}, {"zone": 3, "length": 180}, {"zone": 1, "length": 60}, {"zone": 3, "length": 180}, {"zone": 2, "length": 180}, {"zone": 3, "length": 240}, {"zone": 2, "length": 180}, {"zone": 3, "length": 300}, {"zone": 2, "length": 180}, {"zone": 3, "length": 240}, {"zone": 2, "length": 180}, {"zone": 3, "length": 180}, {"zone": 2, "length": 180}, {"zone": 1, "length": 60}]	2700	2021-10-19 03:37:42.859794+00	5.0	\N
416	873e9c8e-550c-46d2-aa34-93ec61f03954	3-5-7 PZE Pyramid	pze	0	0	0	2	[{"zone": 1, "length": 180}, {"zone": 2, "length": 180}, {"zone": 3, "length": 180}, {"zone": 1, "length": 60}, {"zone": 3, "length": 180}, {"zone": 2, "length": 120}, {"zone": 3, "length": 300}, {"zone": 2, "length": 120}, {"zone": 3, "length": 420}, {"zone": 2, "length": 120}, {"zone": 3, "length": 300}, {"zone": 2, "length": 120}, {"zone": 3, "length": 180}, {"zone": 2, "length": 120}, {"zone": 1, "length": 120}]	2700	2021-10-21 03:08:19.13771+00	5.0	\N
410	873e9c8e-550c-46d2-aa34-93ec61f03954	3-4-6 PZE Pyramid	pze	0	0	0	2	[{"zone": 1, "length": 180}, {"zone": 2, "length": 180}, {"zone": 1, "length": 60}, {"zone": 2, "length": 60}, {"zone": 3, "length": 60}, {"zone": 1, "length": 60}, {"zone": 3, "length": 180}, {"zone": 2, "length": 180}, {"zone": 3, "length": 240}, {"zone": 2, "length": 180}, {"zone": 3, "length": 360}, {"zone": 2, "length": 180}, {"zone": 3, "length": 240}, {"zone": 2, "length": 180}, {"zone": 3, "length": 180}, {"zone": 2, "length": 180}]	2700	2021-10-05 14:52:13.112631+00	5.0	\N
412	873e9c8e-550c-46d2-aa34-93ec61f03954	45 Minute PZ Ride	pz	0	0	0	1	[{"zone": 1, "length": 180}, {"zone": 2, "length": 180}, {"zone": 3, "length": 60}, {"zone": 4, "length": 60}, {"zone": 1, "length": 60}, {"zone": 3, "length": 180}, {"zone": 4, "length": 180}, {"zone": 3, "length": 180}, {"zone": 1, "length": 180}, {"zone": 4, "length": 180}, {"zone": 3, "length": 180}, {"zone": 4, "length": 180}, {"zone": 1, "length": 180}, {"zone": 3, "length": 60}, {"zone": 4, "length": 120}, {"zone": 3, "length": 60}, {"zone": 4, "length": 120}, {"zone": 3, "length": 60}, {"zone": 4, "length": 120}, {"zone": 1, "length": 180}]	2700	2021-10-07 04:36:45.432265+00	5.0	\N
417	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ Endurance 1-3	pze	0	0	0	0	[{"zone": 1, "length": 660}, {"zone": 3, "length": 240}, {"zone": 2, "length": 180}, {"zone": 3, "length": 240}, {"zone": 2, "length": 180}, {"zone": 3, "length": 300}, {"zone": 2, "length": 240}, {"zone": 3, "length": 300}, {"zone": 2, "length": 240}, {"zone": 3, "length": 360}, {"zone": 2, "length": 240}, {"zone": 3, "length": 360}, {"zone": 1, "length": 60}]	3600	2021-10-23 01:17:43.852259+00	5.0	\N
418	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ 2-1	pz	0	0	0	0	[{"zone": 1, "length": 720}, {"zone": 4, "length": 120}, {"zone": 3, "length": 120}, {"zone": 4, "length": 120}, {"zone": 3, "length": 120}, {"zone": 1, "length": 120}, {"zone": 4, "length": 180}, {"zone": 3, "length": 180}, {"zone": 4, "length": 180}, {"zone": 3, "length": 180}, {"zone": 1, "length": 120}, {"zone": 4, "length": 120}, {"zone": 3, "length": 120}, {"zone": 4, "length": 120}, {"zone": 3, "length": 120}, {"zone": 1, "length": 60}]	2700	2021-10-26 18:30:51.749865+00	5.0	\N
419	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ Endurance 2-2	pze	0	0	0	0	[{"zone": 1, "length": 660}, {"zone": 3, "length": 360}, {"zone": 2, "length": 180}, {"zone": 3, "length": 360}, {"zone": 2, "length": 180}, {"zone": 3, "length": 360}, {"zone": 2, "length": 180}, {"zone": 3, "length": 360}, {"zone": 1, "length": 60}]	2700	2021-10-28 06:42:37.768004+00	5.0	\N
420	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ Endurance 1-1	pz	0	0	0	0	[{"zone": 1, "length": 780}, {"zone": 3, "length": 180}, {"zone": 2, "length": 180}, {"zone": 3, "length": 240}, {"zone": 2, "length": 180}, {"zone": 3, "length": 300}, {"zone": 2, "length": 180}, {"zone": 3, "length": 240}, {"zone": 2, "length": 180}, {"zone": 3, "length": 180}, {"zone": 1, "length": 60}]	2700	2021-10-28 17:31:20.482398+00	5.0	\N
421	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ Endurance 1-2	pze	0	0	0	0	[{"zone": 1, "length": 720}, {"zone": 3, "length": 180}, {"zone": 2, "length": 120}, {"zone": 3, "length": 300}, {"zone": 2, "length": 120}, {"zone": 3, "length": 420}, {"zone": 2, "length": 180}, {"zone": 3, "length": 300}, {"zone": 2, "length": 120}, {"zone": 3, "length": 180}, {"zone": 1, "length": 60}]	2700	2021-10-28 19:08:33.521421+00	5.0	\N
422	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ Endurance 2-3	pze	0	0	0	0	[{"zone": 1, "length": 780}, {"zone": 3, "length": 240}, {"zone": 2, "length": 120}, {"zone": 3, "length": 360}, {"zone": 2, "length": 120}, {"zone": 3, "length": 480}, {"zone": 2, "length": 120}, {"zone": 3, "length": 480}, {"zone": 2, "length": 120}, {"zone": 3, "length": 360}, {"zone": 2, "length": 120}, {"zone": 3, "length": 240}, {"zone": 1, "length": 60}, {"zone": 1, "length": 60}]	3600	2021-10-30 00:30:13.618703+00	5.0	\N
428	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ Max 4-1	pzm	0	0	0	0	[{"zone": 1, "length": 780}, {"zone": 5, "length": 120}, {"zone": 1, "length": 60}, {"zone": 6, "length": 60}, {"zone": 1, "length": 60}, {"zone": 5, "length": 120}, {"zone": 1, "length": 60}, {"zone": 6, "length": 60}, {"zone": 1, "length": 180}, {"zone": 5, "length": 120}, {"zone": 1, "length": 60}, {"zone": 6, "length": 60}, {"zone": 1, "length": 60}, {"zone": 5, "length": 120}, {"zone": 1, "length": 60}, {"zone": 6, "length": 60}, {"zone": 1, "length": 180}, {"zone": 6, "length": 60}, {"zone": 4, "length": 120}, {"zone": 7, "length": 60}, {"zone": 1, "length": 60}, {"zone": 6, "length": 60}, {"zone": 4, "length": 120}, {"zone": 7, "length": 60}, {"zone": 1, "length": 60}]	2700	2021-11-09 01:46:45.290254+00	5.0	\N
414	873e9c8e-550c-46d2-aa34-93ec61f03954	3-4-5 PZ Pyramid	pz	0	0	0	3	[{"zone": 1, "length": 180}, {"zone": 2, "length": 180}, {"zone": 3, "length": 60}, {"zone": 4, "length": 60}, {"zone": 5, "length": 60}, {"zone": 1, "length": 60}, {"zone": 2, "length": 120}, {"zone": 3, "length": 120}, {"zone": 2, "length": 120}, {"zone": 4, "length": 120}, {"zone": 2, "length": 120}, {"zone": 5, "length": 60}, {"zone": 2, "length": 120}, {"zone": 4, "length": 120}, {"zone": 2, "length": 120}, {"zone": 3, "length": 120}, {"zone": 1, "length": 60}]	1800	2021-10-15 01:55:20.765238+00	5.0	\N
430	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ 4-3	pz	0	0	0	0	[{"zone": 1, "length": 660}, {"zone": 4, "length": 180}, {"zone": 3, "length": 240}, {"zone": 4, "length": 180}, {"zone": 1, "length": 120}, {"zone": 3, "length": 240}, {"zone": 4, "length": 180}, {"zone": 3, "length": 240}, {"zone": 1, "length": 120}, {"zone": 4, "length": 180}, {"zone": 3, "length": 240}, {"zone": 4, "length": 180}, {"zone": 1, "length": 120}, {"zone": 3, "length": 240}, {"zone": 4, "length": 180}, {"zone": 3, "length": 240}, {"zone": 1, "length": 60}]	3600	2021-11-13 03:01:19.190951+00	5.0	\N
427	873e9c8e-550c-46d2-aa34-93ec61f03954	Descending intervals	pze	0	0	0	2	[{"zone": 1, "length": 180}, {"zone": 2, "length": 180}, {"zone": 3, "length": 180}, {"zone": 1, "length": 60}, {"zone": 3, "length": 600}, {"zone": 2, "length": 240}, {"zone": 3, "length": 480}, {"zone": 2, "length": 240}, {"zone": 3, "length": 360}, {"zone": 1, "length": 180}]	2700	2021-11-08 15:47:25.178654+00	5.0	\N
431	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ ENDURANCE 5-1	pze	0	0	0	0	[{"zone": 1, "length": 660}, {"zone": 3, "length": 300}, {"zone": 2, "length": 180}, {"zone": 3, "length": 420}, {"zone": 2, "length": 180}, {"zone": 3, "length": 420}, {"zone": 2, "length": 180}, {"zone": 3, "length": 300}, {"zone": 1, "length": 60}]	2700	2021-11-16 06:34:23.690835+00	5.0	\N
432	9a54c094-8542-4b0a-90d5-97c1e34413a0	BYPZ Endurance 5-2	pze	0	0	0	0	[{"zone": 1, "length": 780}, {"zone": 3, "length": 180}, {"zone": 2, "length": 180}, {"zone": 3, "length": 240}, {"zone": 2, "length": 180}, {"zone": 3, "length": 300}, {"zone": 2, "length": 180}, {"zone": 3, "length": 240}, {"zone": 2, "length": 180}, {"zone": 3, "length": 180}, {"zone": 1, "length": 60}]	2700	2021-11-17 18:51:46.406084+00	5.0	\N
433	9a54c094-8542-4b0a-90d5-97c1e34413a0	Olivia 8/8/21	pze	0	0	0	0	[{"zone": 1, "length": 660}, {"zone": 2, "length": 120}, {"zone": 3, "length": 120}, {"zone": 2, "length": 120}, {"zone": 3, "length": 180}, {"zone": 2, "length": 120}, {"zone": 3, "length": 240}, {"zone": 1, "length": 120}, {"zone": 2, "length": 120}, {"zone": 3, "length": 120}, {"zone": 2, "length": 120}, {"zone": 3, "length": 180}, {"zone": 2, "length": 120}, {"zone": 3, "length": 300}, {"zone": 1, "length": 60}]	2700	2021-11-30 06:37:16.07325+00	5.0	\N
\.


--
-- Data for Name: user_follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_follows (id, user_id, friend_id, created_at) FROM stdin;
1	873e9c8e-550c-46d2-aa34-93ec61f03954	9a54c094-8542-4b0a-90d5-97c1e34413a0	2021-11-28 02:11:40.135867+00
\.


--
-- Data for Name: user_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_likes (ride_id, user_id) FROM stdin;
\.


--
-- Data for Name: user_rides; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_rides (id, user_id, ride_id, ridden_at) FROM stdin;
1	873e9c8e-550c-46d2-aa34-93ec61f03954	3	2021-11-03 00:52:58.076599+00
2	873e9c8e-550c-46d2-aa34-93ec61f03954	3	2021-11-03 00:55:53.810663+00
3	873e9c8e-550c-46d2-aa34-93ec61f03954	415	2021-11-03 15:38:15.351239+00
4	9a54c094-8542-4b0a-90d5-97c1e34413a0	424	2021-11-04 01:09:51.587634+00
5	873e9c8e-550c-46d2-aa34-93ec61f03954	\N	2021-11-05 15:35:01.819324+00
6	9a54c094-8542-4b0a-90d5-97c1e34413a0	425	2021-11-05 22:40:37.979847+00
7	9a54c094-8542-4b0a-90d5-97c1e34413a0	425	2021-11-05 22:51:05.685934+00
8	873e9c8e-550c-46d2-aa34-93ec61f03954	410	2021-11-06 16:45:59.049889+00
9	873e9c8e-550c-46d2-aa34-93ec61f03954	\N	2021-11-08 16:18:36.011003+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, username, password, admin) FROM stdin;
873e9c8e-550c-46d2-aa34-93ec61f03954	ericdo.617@gmail.com	doboi	$2a$08$Ka7fHL5gV5csNuH8r/QXBO.i7fQxuu18LRSnJAFgPeL.5FmNpjwje	t
9a54c094-8542-4b0a-90d5-97c1e34413a0	tokickHD@gmail.com	tokick	$2a$08$FnQVszdVIT05wxuQG7arIeZ.V2AuErjaLpQ61NCjh0PpHiBp.onPu	f
\.


--
-- Name: ride_ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ride_ratings_id_seq', 1, true);


--
-- Name: rides_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rides_id_seq', 434, true);


--
-- Name: user_follows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_follows_id_seq', 1, true);


--
-- Name: user_rides_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_rides_id_seq', 9, true);


--
-- Name: ride_types ride_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ride_types
    ADD CONSTRAINT ride_types_pkey PRIMARY KEY (type);


--
-- Name: rides rides_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rides
    ADD CONSTRAINT rides_pkey PRIMARY KEY (id);


--
-- Name: user_follows user_follows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_follows
    ADD CONSTRAINT user_follows_pkey PRIMARY KEY (user_id, friend_id);


--
-- Name: user_likes user_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_likes
    ADD CONSTRAINT user_likes_pkey PRIMARY KEY (ride_id, user_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: lower_case_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lower_case_username ON public.users USING btree (lower(username));


--
-- Name: rideratings_rideid_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rideratings_rideid_idx ON public.ride_ratings USING btree (ride_id);


--
-- Name: rides_creator_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rides_creator_index ON public.rides USING btree (creator_id);


--
-- Name: rides_time_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rides_time_index ON public.rides USING btree (timeinseconds);


--
-- Name: rides_type_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rides_type_index ON public.rides USING btree (type);


--
-- Name: user_follows_friendid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_follows_friendid_index ON public.user_follows USING btree (friend_id);


--
-- Name: user_follows_userid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_follows_userid_index ON public.user_follows USING btree (user_id);


--
-- Name: user_rides_userid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_rides_userid_index ON public.user_rides USING btree (user_id);


--
-- Name: userrlikes_userid_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX userrlikes_userid_idx ON public.user_likes USING btree (user_id);


--
-- Name: users_admin_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_admin_idx ON public.users USING btree (admin);


--
-- Name: users_username_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_username_idx ON public.users USING btree (username);


--
-- Name: ride_ratings ride_ratings_ride_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ride_ratings
    ADD CONSTRAINT ride_ratings_ride_id_fkey FOREIGN KEY (ride_id) REFERENCES public.rides(id) ON DELETE CASCADE;


--
-- Name: ride_ratings ride_ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ride_ratings
    ADD CONSTRAINT ride_ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: rides rides_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rides
    ADD CONSTRAINT rides_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: rides rides_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rides
    ADD CONSTRAINT rides_type_fkey FOREIGN KEY (type) REFERENCES public.ride_types(type);


--
-- Name: user_follows user_follows_friend_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_follows
    ADD CONSTRAINT user_follows_friend_id_fkey FOREIGN KEY (friend_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_follows user_follows_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_follows
    ADD CONSTRAINT user_follows_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_likes user_likes_ride_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_likes
    ADD CONSTRAINT user_likes_ride_id_fkey FOREIGN KEY (ride_id) REFERENCES public.rides(id) ON DELETE CASCADE;


--
-- Name: user_likes user_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_likes
    ADD CONSTRAINT user_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_rides user_rides_ride_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_rides
    ADD CONSTRAINT user_rides_ride_id_fkey FOREIGN KEY (ride_id) REFERENCES public.rides(id) ON DELETE CASCADE;


--
-- Name: user_rides user_rides_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_rides
    ADD CONSTRAINT user_rides_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO postgres;


--
-- Name: TABLE user_follows; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.user_follows TO postgres;


--
-- Name: TABLE user_rides; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.user_rides TO postgres;


--
-- PostgreSQL database dump complete
--

