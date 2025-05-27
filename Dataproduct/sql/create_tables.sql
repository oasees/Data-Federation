CREATE TABLE public.ces (
        ces_id varchar(250) NOT NULL,
        dataProduct_json json NULL,
        compliance_json json  NULL,
        CONSTRAINT ces_pkey PRIMARY KEY (ces_id)
);
CREATE TABLE public.dp (
        dataProductName varchar(255) NULL,
        CONSTRAINT dp_pkey PRIMARY KEY (dataProductName)
);

