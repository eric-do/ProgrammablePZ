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
    user_id integer,
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
    creator_id integer,
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
    user_id integer NOT NULL,
    friend_id integer NOT NULL,
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
    user_id integer NOT NULL
);


ALTER TABLE public.user_likes OWNER TO postgres;

--
-- Name: user_rides; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_rides (
    id integer NOT NULL,
    user_id integer,
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
    id integer GENERATED ALWAYS AS IDENTITY,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    admin boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

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

