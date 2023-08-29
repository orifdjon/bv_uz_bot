import { type Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema
    .raw(`
      CREATE TABLE IF NOT EXISTS grade (
        id        uuid not null primary key,
        name      varchar(255) not null,
        cash_back integer not null
      )
    `)
    .raw(`
      CREATE TABLE IF NOT EXISTS "user" (
        first_name   varchar(100),
        birth_date   timestamp,
        second_name  varchar(100),
        phone_number varchar(20) not null constraint user_pk primary key,
        city         varchar(200),
        sex          varchar(10),
        grade_id     uuid references grade,
        address_id   uuid
      )
    `)
    .raw('CREATE INDEX IF NOT EXISTS user_grade_id_index ON "user" (grade_id)')
    .raw(`
      CREATE TABLE IF NOT EXISTS "order" (
        id           uuid not null primary key,
        price        bigint not null,
        created_at   timestamp with time zone not null,
        update_at    timestamp with time zone not null,
        phone_number varchar(20) references "user",
        status       varchar(255) not null
      )
    `)
    .raw('CREATE INDEX IF NOT EXISTS order_phone_number_index ON "order" (phone_number)')
    .raw(`
        CREATE TABLE IF NOT EXISTS product_cash_back
        (
            id        uuid not null primary key,
            status    varchar(255) not null,
            cash_back bigint not null
        )
    `)
    .raw(`
      CREATE TABLE IF NOT EXISTS product (
        id     uuid not null constraint product_pk primary key,
        name   varchar(255) not null,
        type   varchar(255) not null,
        volume integer,
        price  bigint,
        cost   bigint
      )
    `)
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema
    .dropTableIfExists('product')
    .dropTableIfExists('product_cash_back')
    .dropTableIfExists('order')
    .dropTableIfExists('user')
    .dropTableIfExists('grade')
}
